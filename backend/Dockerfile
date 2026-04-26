FROM python:3.12

## Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install Packages
RUN pip install -r requirements.txt

# Set an environment variable for the port for 8080
ENV PORT 8080

# Run gunicorn bound to the 8080 port.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 main:app
