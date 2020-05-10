import json

# Reads data from a JSON file
# callback: data handler function
# file_:    file name to read data from
def get_data (callback, file_):
    try:
        with open(file_) as f:
            callback(json.load(f))
    except OSError as e:
        # Exception handling code
        pass

# Save JSON data to a file
# Warning: overwrites the file
# data:     data to serialize
# file_:    file name to write to
def save_data (data, file_):
    with open(file_, 'w') as f:
        json.dump(data, f)
