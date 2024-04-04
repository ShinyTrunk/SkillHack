import os
import string
from faker import Faker

from flask import Flask, render_template, redirect
from database_init import db
from models.users import User
from forms.register_form import RegistrationForm
from forms.login_form import LoginForm

fake = Faker()

file_path = f'{os.path.abspath(os.getcwd())}\\db\\main.db'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + file_path
app.config['SECRET_KEY'] = 'yandexlyceum_secret_key'


def main():
    db.init_app(app)
    app.app_context().push()
    db.create_all()
    print('Database')
    app.run(port=5002, debug=True)


@app.route('/')
@app.route('/index')
def index():
    user = User(username=fake.name(), hashed_password=fake.postcode(), email=fake.ascii_free_email())
    db.session.add(user)
    db.session.commit()
    return '<h1>Hello World!</h1>'


@app.route('/skills')
def skills_page():
    pass


@app.route('/skill/<skill_name>')
def skill_page(skill_name):
    params = {'title': f'Навык {skill_name}', 'skill_name': skill_name}



@app.route('/sign-in-sign-up')
def login_page():
    register_form = RegistrationForm()
    login_form = LoginForm()
    params = {'register_form': register_form, 'login_form': login_form}
    if register_form.validate_on_submit():
        return redirect('/success')
    if login_form.validate_on_submit():
        return redirect('/success')
    return render_template('register.html', **params)


@app.route('/about-us')
def about_us_page():
    pass


@app.route('/profile')
def profile_page():
    pass


if __name__ == '__main__':
    main()
