from flask import Flask, render_template, redirect, request, abort

app = Flask(__name__)


def main():
    pass


@app.route('/')
@app.route('/index')
def index():
    pass


@app.route('/skills')
def skills_page():
    pass


@app.route('/login')
def login_page():
    pass


@app.route('/about-us')
def about_us_page():
    pass


@app.route('/profile')
def profile_page():
    pass


if __name__ == '__main__':
    main()
