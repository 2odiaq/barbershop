# Precision Cuts Barbershop Website

A modern, responsive website for a barbershop that showcases services, allows appointment bookings, and strengthens online presence.

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Service Showcase**: Display of all barbershop services with details and pricing
- **Online Booking System**: Appointment scheduling with service and barber selection
- **Team Profiles**: Information about barbers and their expertise
- **Testimonials**: Customer reviews and ratings
- **Gallery**: Showcase of haircut styles and barbershop interior
- **Contact Information**: Easy access to location, hours, and contact details
- **SEO-Friendly**: Optimized for search engines

## Technologies Used

- **Backend**: Python 3 with Flask framework
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: SQLite (SQLAlchemy ORM)
- **Styling**: Bootstrap 5 framework for responsive design
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Oswald, Roboto)

## Project Structure

```
barbershop-website/
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── booking.js
│   └── images/
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── booking.html
│   ├── gallery.html
│   ├── testimonials.html
│   └── contact.html
├── app.py
├── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8+
- pip package manager

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/barbershop-website.git
   cd barbershop-website
   ```

2. Create a virtual environment and activate it:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root with the following content:

   ```
   SECRET_KEY=your_secret_key
   DATABASE_URI=sqlite:///barber.db
   ```

5. Run the application:

   ```
   python app.py
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Database Initialization

The database is automatically created when the application runs for the first time. To add initial data:

1. Access the Flask shell:

   ```
   flask shell
   ```

2. Add sample services and barbers:

   ```python
   from app import db, Service, Barber

   # Add services
   service1 = Service(name="Classic Haircut", description="Traditional haircut with clippers and scissors", duration=30, price=25.00, category="Haircuts")
   service2 = Service(name="Beard Trim", description="Shape and trim your beard for a clean look", duration=15, price=15.00, category="Beard")
   db.session.add_all([service1, service2])

   # Add barbers
   barber1 = Barber(name="John Smith", bio="Master barber with 10+ years of experience", photo_url="john.jpg")
   barber2 = Barber(name="Michael Brown", bio="Specializes in modern and trendy cuts", photo_url="michael.jpg")
   db.session.add_all([barber1, barber2])

   db.session.commit()
   ```

## Deployment

### Web Server Configuration

For production deployment, use a proper WSGI server like Gunicorn and a reverse proxy like Nginx.

1. Install Gunicorn:

   ```
   pip install gunicorn
   ```

2. Create a systemd service file (for Linux servers):

   ```
   [Unit]
   Description=Gunicorn instance to serve barbershop website
   After=network.target

   [Service]
   User=yourusername
   Group=www-data
   WorkingDirectory=/path/to/barbershop-website
   Environment="PATH=/path/to/barbershop-website/venv/bin"
   ExecStart=/path/to/barbershop-website/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 app:app

   [Install]
   WantedBy=multi-user.target
   ```

3. Nginx configuration:

   ```
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /static {
           alias /path/to/barbershop-website/static;
       }
   }
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap for the responsive framework
- Font Awesome for the icons
- Google Fonts for typography
- All images should be properly credited to their respective owners
