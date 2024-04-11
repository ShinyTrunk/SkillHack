from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.simple import BooleanField, SubmitField
from wtforms.validators import InputRequired


class LoginForm(FlaskForm):
    email = StringField(validators=[InputRequired()])
    password = PasswordField(validators=[InputRequired()])
    login_button = SubmitField()
    remember_me = BooleanField()
