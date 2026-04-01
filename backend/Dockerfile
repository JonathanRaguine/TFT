# Start with a Python 3.11 base image
# Think of this as "start with a mini-computer that already has Python installed"
FROM python:3.11-slim

# Set the working directory inside the container
# Every command after this runs from /app
WORKDIR /app

# Copy ONLY requirements.txt first (not all code)
# Docker caches each step — if requirements.txt hasn't changed,
# it skips reinstalling packages. This saves time on rebuilds.
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# NOW copy the rest of the backend code
COPY . .

# Tell Docker this container listens on port 8000
EXPOSE 8000

# The command that runs when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]