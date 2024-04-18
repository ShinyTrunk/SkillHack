import os
import string
from faker import Faker

from flask import Flask, render_template, redirect, url_for
from flask_login import login_required, logout_user
from database_init import db
from models.users import User
from forms.register_form import RegistrationForm
from forms.login_form import LoginForm

fake = Faker()

if 'db' not in os.listdir():
    os.mkdir('db')
file_path = f'{os.path.abspath(os.getcwd())}\\db\\main.db'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + file_path
app.config['SECRET_KEY'] = 'yandexlyceum_secret_key'


def main():
    db.init_app(app)
    app.app_context().push()
    db.create_all()
    print('Database')
    app.run(port=5000, debug=True)

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
    return render_template('index.html')


@app.route('/skills')
def skills_page():
    return "<h1>Skills</h1>"


@app.route('/skill/<skill_name>')
def skill_page(skill_name):
    params = {'title': f'Навык {skill_name}', 'skill_name': skill_name}


@app.route('/sign-in-sign-up', methods=['GET', 'POST'])
def login_page():
    register_form = RegistrationForm()
    login_form = LoginForm()
    params = {'register_form': register_form, 'login_form': login_form}
    if register_form.validate_on_submit() and register_form.registration_button.data:
        print('register')
        user = User(username=register_form.username.data, email=register_form.register_email.data)
        user.set_password(register_form.register_password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('profile_page'))
    if login_form.validate_on_submit() and login_form.login_button.data:
        print('login')
        current_user_email = (login_form.login_email.data, )
        users_email = db.session.query(User.email).all()
        # print((login_form.login_email.data, ), users_email[current_user_email])
        if (login_form.login_email.data, ) in users_email:
            print('YEAAAA')
            if login_form.login_password.data == users_email.password:
                print('good pass')
        return redirect(url_for('profile_page'))
    return render_template('register.html', **params)


@app.route('/about-us')
def about_us_page():
    pass


@app.route('/profile')
def profile_page():
    return render_template('account.html')


if __name__ == '__main__':
    main()
