# Name : Anneke ter Schure
# Student number : 6084087
'''
This module contains an implementation of split_string.
'''

# You are not allowed to use the standard string.split() function, use of the
# regular expression module, however, is allowed.
# To test your implementation use the test-exercise.py script.

# A note about the proper programming style in Python:
#
# Python uses indentation to define blocks and thus is sensitive to the
# whitespace you use. It is convention to use 4 spaces to indent your
# code. Never, ever mix tabs and spaces - that is a source of bugs and
# failures in Python programs.


def split_string(source, separators):
    '''
    Split a string <source> on all of the characters in <separators>.

    The ouput of this function should be a list of strings split at the
    positions of each of the separator characters.
    '''

    # initialise lists
    word = ""
    result = []

    # loop over the characters in source
    # make new strings when a single space is encountered and skip over separator characters
    for char in source:
        if char == " " or char in separators:
            if word != "":
                result.append(word)
                word = ""
        elif char not in separators:
            word += char

    if word != "":
        result.append(word)

    return result

if __name__ == '__main__':
    # You can try to run your implementation here, that will not affect the
    # automated tests.

    print split_string('abacadabra', 'ba')  # should print: ['c', 'd', 'r']
