from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.fields.simple import SubmitField
from wtforms.validators import InputRequired, Email, EqualTo, Length


class RegistrationForm(FlaskForm):
    username = StringField(
        validators=[
            InputRequired(message="Не заполнено поле никнейма"),
            Length(
                min=3, max=20, message="Длина никнейма должна быть от 3 до 20 символов"
            ),
        ]
    )

    register_email = EmailField(
        validators=[
            InputRequired(message="Не заполнено поле никнейма"),
            Email(message="Неверно указан email"),
        ]
    )
    register_password = PasswordField(
        validators=[
            InputRequired(message="Не заполнено поле пароля"),
            EqualTo("confirm_password", message="Пароли должны совпадать"),
            Length(
                min=8, max=30, message="Длина пароля должна быть от 8 до 30 символов"
            ),
        ]
    )
    confirm_password = PasswordField()
    registration_button = SubmitField()
