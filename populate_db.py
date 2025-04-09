from app import db, Service, Barber, Testimonial
from datetime import datetime, date

# Add services
services = [
    Service(name='Classic Haircut', description='Traditional haircut with clippers and scissors for a clean, classic look.', duration=30, price=25.00, category='Haircuts'),
    Service(name='Beard Trim', description='Shape and trim your beard for a clean and professional appearance.', duration=15, price=15.00, category='Beard'),
    Service(name='Hot Towel Shave', description='Relaxing hot towel treatment followed by a close, precise shave.', duration=30, price=30.00, category='Shave'),
    Service(name='Hair & Beard Combo', description='Complete package including haircut and beard grooming.', duration=45, price=40.00, category='Combo'),
    Service(name='Kids Haircut', description='Haircut service for children under 12 years.', duration=20, price=18.00, category='Haircuts'),
    Service(name='Senior Haircut', description='Haircut service for senior citizens.', duration=30, price=20.00, category='Haircuts')
]

# Add barbers
barbers = [
    Barber(name='Robert Johnson', bio='Founder and master barber with over 15 years of experience. Specializes in classic cuts and hot towel shaves.', photo_url='barber1.jpg'),
    Barber(name='Michael Torres', bio='Skilled barber with 8 years of experience. Known for precision fades and beard styling.', photo_url='barber2.jpg'),
    Barber(name='David Wilson', bio='Brings 5 years of expertise in modern styles and creative designs. Popular with younger clients.', photo_url='barber3.jpg')
]

# Add testimonials
testimonials = [
    Testimonial(customer_name='James Smith', content='Best haircut I\'ve had in years! Robert really knows his craft.', rating=5, date=date(2024, 3, 15)),
    Testimonial(customer_name='Thomas Brown', content='Great atmosphere and professional service. Will definitely be returning.', rating=5, date=date(2024, 3, 10)),
    Testimonial(customer_name='William Davis', content='Michael did an amazing job with my beard trim. Highly recommend!', rating=4, date=date(2024, 2, 28))
]

# Clear existing data first
db.session.query(Service).delete()
db.session.query(Barber).delete()
db.session.query(Testimonial).delete()

# Add new data
db.session.add_all(services)
db.session.add_all(barbers)
db.session.add_all(testimonials)

# Commit changes
db.session.commit()

print('Added {} services, {} barbers, and {} testimonials to the database'.format(len(services), len(barbers), len(testimonials))) 