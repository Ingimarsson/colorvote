from setuptools import setup

setup(name='colorvote',
      version='0.1',
      description='A package for the colored coins voting protocol',
      url='http://github.com/Ingimarsson/colorvote',
      author='Brynjar Ingimarsson',
      author_email='brynjar@ingimarsson.is',
      license='MIT',
      packages=['colorvote'],
      install_requires=[
          'requests',
      ],
      zip_safe=False)
