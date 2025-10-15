import imp
import os
import sys

# Path to this file
BASE_DIR = os.path.dirname(__file__)

# Add backend folder to sys.path
sys.path.insert(0, os.path.join(BASE_DIR))

# Load run.py
wsgi = imp.load_source('wsgi', os.path.join(BASE_DIR, 'app.py'))
application = wsgi.app