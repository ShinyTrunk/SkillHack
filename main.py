import os
import string

import wtforms
from faker import Faker

from flask import Flask, render_template, redirect, url_for
from database_init import db
from models.users import User
from forms.register_form import RegistrationForm
from forms.login_form import LoginForm
from flask_login import LoginManager, login_user, login_required, logout_user

fake = Faker()

if 'db' not in os.listdir():
    os.mkdir('db')
file_path = f'{os.path.abspath(os.getcwd())}\\db\\main.db'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + file_path
app.config['SECRET_KEY'] = 'yandexlyceum_secret_key'
login_manager = LoginManager()
login_manager.init_app(app)


def main():
    db.init_app(app)
    app.app_context().push()
    db.create_all()
    print('Database')
    app.run(port=5002, debug=True)


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route('/')
@app.route('/index')
def index():
    # user = User(username=fake.name(), hashed_password=fake.postcode(), email=fake.ascii_free_email())
    # db.session.add(user)
    # db.session.commit()
    params = {"title": "ГЛАВНАЯ"}
    return render_template('index.html', **params)


@app.route('/all-skills')
def all_skills_page():
    params = {"title": "Навыки"}
    return render_template('all_skills.html', **params)


@app.route('/skill/<skill_name>')
def skill_page(skill_name):
    params = {'title': f'Навык {skill_name.capitalize()}', 'skill_name': skill_name}
    return render_template('skill.html', **params)


@app.route('/sign-in-sign-up', methods=['GET', 'POST'])
def login_page():
    register_form = RegistrationForm()
    login_form = LoginForm()
    params = {'register_form': register_form, 'login_form': login_form, "title": "Регистрация/Авторизация"}
    if register_form.validate_on_submit():
        print('register')
        user = User(username=register_form.username.data, email=register_form.register_email.data)
        user.set_password(register_form.register_password.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        params = {'title': 'Профиль'}
        return redirect(url_for('profile_page', **params))
    if login_form.validate_on_submit():
        print('login')
        user = db.session.query(User).filter(User.email == login_form.login_email.data).first()
        if user and user.check_password(login_form.login_password.data):
            login_user(user, remember=login_form.remember_me.data)
            params = {'title': 'Профиль'}
            return redirect(url_for('profile_page', **params))
        params = {'register_form': register_form, 'login_form': login_form, 'message': "Неправильный логин или пароль",
                  "title": "Регистрация/Авторизация"}
        return render_template('register.html', **params)
    return render_template('register.html', **params)


@app.route('/about-us')
def about_us_page():
    pass


@app.route('/profile')
def profile_page():
    params = {'title': "Профиль"}
    return render_template('account.html', **params)


if __name__ == '__main__':
    main()
