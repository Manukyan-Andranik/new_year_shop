import imp
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

wsgi = imp.load_source('wsgi', 'app.py')

# This exposes the Flask app at the root level
application = wsgi.app

# If you want to mount it at /mandarin as well, uncomment below:
from werkzeug.middleware.dispatcher import DispatcherMiddleware
application = DispatcherMiddleware(wsgi.app, {
    '/mandarin': wsgi.app
})