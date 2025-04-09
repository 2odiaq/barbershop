from flask import Flask, render_template, request, redirect, url_for, flash
import os
from datetime import datetime
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///barber.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # Duration in minutes
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)

class Barber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)
    photo_url = db.Column(db.String(255))

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(100), nullable=False)
    customer_phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    barber_id = db.Column(db.Integer, db.ForeignKey('barber.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    service = db.relationship('Service', backref='appointments')
    barber = db.relationship('Barber', backref='appointments')

class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # Rating out of 5
    date = db.Column(db.Date, default=datetime.utcnow)

# Routes
@app.route('/')
def index():
    services = Service.query.limit(3).all()
    testimonials = Testimonial.query.order_by(Testimonial.id.desc()).limit(3).all()
    return render_template('index.html', services=services, testimonials=testimonials)

@app.route('/about')
def about():
    barbers = Barber.query.all()
    return render_template('about.html', barbers=barbers)

@app.route('/services')
def services():
    services = Service.query.all()
    categories = db.session.query(Service.category).distinct().all()
    return render_template('services.html', services=services, categories=categories)

@app.route('/booking', methods=['GET', 'POST'])
def booking():
    services = Service.query.all()
    barbers = Barber.query.all()
    
    if request.method == 'POST':
        # Handle form submission (create new appointment)
        try:
            new_appointment = Appointment(
                customer_name=request.form.get('name'),
                customer_email=request.form.get('email'),
                customer_phone=request.form.get('phone'),
                date=datetime.strptime(request.form.get('date'), '%Y-%m-%d').date(),
                time=datetime.strptime(request.form.get('time'), '%H:%M').time(),
                service_id=request.form.get('service_id'),
                barber_id=request.form.get('barber_id')
            )
            db.session.add(new_appointment)
            db.session.commit()
            flash('Appointment booked successfully!', 'success')
            return redirect(url_for('booking'))
        except Exception as e:
            flash(f'Error booking appointment: {str(e)}', 'danger')
            db.session.rollback()
    
    return render_template('booking.html', services=services, barbers=barbers)

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/testimonials')
def testimonials():
    testimonials = Testimonial.query.order_by(Testimonial.date.desc()).all()
    return render_template('testimonials.html', testimonials=testimonials)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/submit_testimonial', methods=['POST'])
def submit_testimonial():
    try:
        new_testimonial = Testimonial(
            customer_name=request.form.get('name'),
            content=request.form.get('content'),
            rating=int(request.form.get('rating'))
        )
        db.session.add(new_testimonial)
        db.session.commit()
        flash('Thank you for your feedback!', 'success')
    except Exception as e:
        flash(f'Error submitting testimonial: {str(e)}', 'danger')
        db.session.rollback()
    
    return redirect(url_for('testimonials'))

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='localhost', port=49152, debug=True)
