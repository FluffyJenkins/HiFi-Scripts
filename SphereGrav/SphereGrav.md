# SphereGrav

## How to use!

1. You firstly need a sphere to act as the "Gravity Field" for the script.
2. You will need to set the sphere to be collisionless and when you are done, invisible as well!
3. You will need to add some userdata into the sphere to customize the behavour!
```
{"inverted":false,"gravity":-5,"soundURL":""}

Inverted controls if the gravity is inverted for e.g. an insideout planet.

Gravity is the strength of gravity pulling you down, the default is -5 (this is hifi's default gravity as well)

SoundURL is for a url of a sound that will play for you when you enter or leave the gravity field
```
4. You then put the script url into the Scripts field of the sphere.
5. Now you can finally make the sphere invisible!
6. Remember if you want to change the settings you will need to reload the script by clicking on the reload icon or by cachebusting the url!
```
Cachebusting a url looks like this:

https://google.com   < normal url
https://google.com?1 < cachebusted url

The ?1 basically changes the url without effecting the actually url, you can have any number you want after the ? for e.g.
https://google.com?1337423147
```

## Additional

This script will also effect physical entities with a gravity set with a negative y!

## Credits

Just Fluffy Jenkins unless someone wants to help spruce up my readme!