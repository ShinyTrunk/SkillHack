import json
import os

import requests
from faker import Faker

from flask import Flask, render_template, redirect, url_for, request
from database_init import db
from models.users import User
from forms.register_form import RegistrationForm
from forms.login_form import LoginForm
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    logout_user,
    current_user,
)

fake = Faker()

if "db" not in os.listdir():
    os.mkdir("db")
file_path = f"{os.path.abspath(os.getcwd())}\\db\\main.db"
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + file_path
app.config["SECRET_KEY"] = "yandexlyceum_secret_key"
login_manager = LoginManager()
login_manager.init_app(app)


def main():
    db.init_app(app)
    app.app_context().push()
    db.create_all()
    print("Database")
    app.run(port=5002, debug=True)


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route("/validate_profile", methods=["POST"])
def validate_profile():
    username = request.json["username"]
    password = request.json["password"]
    confirm_password = request.json["confirm_password"]
    if (
        username
        and 3 <= len(username) <= 20
        and password
        and 8 <= len(password) <= 30
        and password == confirm_password
    ):
        response = {"status": "success"}
        user = db.session.query(User).filter(User.email == current_user.email).first()
        if user:
            user.username = username
            user.set_password(password)
            db.session.commit()
        else:
            print("User not found")
        return json.dumps(response)
    else:
        response = {"status": "error", "messages": []}
        if not username:
            response["messages"].append("Не заполнено поле никнейма")
            # return json.dumps({'status': 'error', 'message': ['Не заполнено поле никнейма']})
        else:
            if not 3 <= len(username) <= 20:
                response["messages"].append(
                    "Длина никнейма должна быть не меньше 3 и не больше 20 символов"
                )
                # return json.dumps(
                #     {'status': 'error', 'message': ['Длина никнейма должна быть больше 3 и меньше 20 символов']})
        if not password:
            response["messages"].append("Не заполнено поле пароля")
            # return json.dumps({'status': 'error', 'message': ['Не заполнено поле никнейма']})
        else:
            if not 8 <= len(password) <= 30:
                response["messages"].append(
                    "Длина пароля должна быть не меньше 8 и не больше 30 символов"
                )
            if password != confirm_password:
                response["messages"].append("Пароли должны совпадать")
        return json.dumps(response)


@app.route("/")
@app.route("/index", methods=["GET", "POST"])
def index():
    params = {"title": "ГЛАВНАЯ"}
    return render_template("index.html", **params)


@app.route("/all-skills", methods=["GET", "POST"])
def all_skills_page():
    params = {"title": "Навыки"}
    return render_template("all_skills.html", **params)


@app.route("/skill/<skill_name>", methods=["GET", "POST"])
def skill_page(skill_name):
    if not current_user.is_authenticated:
        return redirect(url_for("login_page"))
    try:
        with open(
            f"static/roadmaps/roadmap_{skill_name}.json", encoding="utf-8"
        ) as json_file:
            roadmap_data = json.load(json_file)
            # print(len(roadmap_data))
    except FileNotFoundError as error:
        raise error
    # roadmap = json.load('../static/roadmaps/roadmap_css.json')
    params = {
        "title": f"Навык {skill_name.capitalize()}",
        "skill_name": skill_name,
        "roadmap_data": roadmap_data,
    }
    return render_template("skill.html", **params)


@app.route("/sign-in-sign-up", methods=["GET", "POST"])
def login_page():
    if current_user.is_authenticated:
        return redirect(url_for("profile_page"))
    register_form = RegistrationForm()
    login_form = LoginForm()
    params = {
        "register_form": register_form,
        "login_form": login_form,
        "title": "Регистрация/Авторизация",
    }
    if register_form.validate_on_submit():
        print("register")
        user = User(
            username=register_form.username.data,
            email=register_form.register_email.data,
        )
        user.set_password(register_form.register_password.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        params = {"title": "Профиль"}
        return redirect(url_for("profile_page", **params))
    if login_form.validate_on_submit():
        print("login")
        user = (
            db.session.query(User)
            .filter(User.email == login_form.login_email.data)
            .first()
        )
        if user and user.check_password(login_form.login_password.data):
            login_user(user, remember=login_form.remember_me.data)
            params = {"title": "Профиль"}
            return redirect(url_for("profile_page", **params))
        params = {
            "register_form": register_form,
            "login_form": login_form,
            "message": "Неправильный логин или пароль",
            "title": "Регистрация/Авторизация",
        }
        return render_template("register.html", **params)
    return render_template("register.html", **params)


@app.route("/about-us", methods=["GET"])
def about_us_page():
    response = requests.get("https://www.cbr-xml-daily.ru/daily_json.js")
    usd_exchange = response.json()["Valute"]["USD"]["Value"]
    return render_template("about_us.html", usd_exchange=usd_exchange)


@app.route("/contact-us", methods=["GET"])
def contact_us_page():
    return render_template("contact_us.html")


@app.route("/profile", methods=["GET", "POST"])
def profile_page():
    if not current_user.is_authenticated:
        return redirect(url_for("login_page"))
    params = {"title": "Профиль"}
    return render_template("account.html", **params)


if __name__ == "__main__":
    main()
