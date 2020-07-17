from setuptools import setup

with open('README.md', 'r') as fh:
  long_description = fh.read()

setup(
  name='colorvote',
  version='0.1',
  description='A package for the colored coins voting protocol',
  url='http://github.com/Ingimarsson/colorvote',
  author='Brynjar Ingimarsson',
  author_email='brynjar@ingimarsson.is',
  long_description=long_description,
  long_description_content_type='text/markdown',
  license='MIT',
  packages=['colorvote'],
  install_requires=[
    'requests',
  ],
  zip_safe=False,
  python_requires='>=3.6'
)
