from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.fields.simple import BooleanField, SubmitField
from wtforms.validators import InputRequired


class LoginForm(FlaskForm):
    login_email = EmailField(validators=[InputRequired(message="123wqe")])
    login_password = PasswordField(validators=[InputRequired()])
    login_button = SubmitField()
    remember_me = BooleanField()
