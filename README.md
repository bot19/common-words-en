# Most common English words list

Preparing an English word list suitable for my upcoming Engish learning game [Wordlecate](https://wordlecate.netlify.app/). Need the 5,000-10,000 most common English words in the appropriate data format.

Now also includes an extra "dictionary" list, which encompasses the common words list and many more words that users might input to guess the common words. This is to do client-side word validation vs using a dictionary API.

## 🏁 Features/objectives

1. words are from the 5,000-10,000 most common English words (US, UK)
2. separate word lists by length & alphabetical order
3. clean word lists of duplicates and inappropriate words (children friendly)
4. each list to include basic information, like list length/count
5. has 58,000 dictionary word list for client-side word validation

## 🖥️ Tech

1. good ol' javascript/node

## 🚀 How to run

1. not much to run, as output will be included
2. either copy-paste into browser console or execute via node in terminal

## 📝 Notes

- base common words "seeds" list is from: frequencylist.com
- updated "seeds" list with wordlist.aspell.net/12dicts/ US-UK 4700 words list
- updated "seeds" list again with another 5000 essential word list + further cleaning
- word length 3 words: 307 > 323 > 311
- word length 4 words: 772 > 846 > 859
- word length 5 words: 824 > 949 > 1005
- word length 6 words: 791 > 983 > 1081
- word length 7 words: 669 > 896 > 1016
- word length 8 words: 444 > 665 > 799
- word length 9 words: 287 > 475 > 615
- word length 10 words: 186 > 338 > 468
- word length 11 words: 96 > 187 > 270
