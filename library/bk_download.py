import kagglehub

# Download latest version
path = kagglehub.dataset_download("opalskies/large-books-metadata-dataset-50-mill-entries")

print("Path to dataset files:", path)