# soundOnEntry

## How to use! 
##### (for demo entity to import click [here](soundOnEntry%20Demo.json))

1. You firstly need an entity to act as the area for the avatar to be in for the script.
2. You will need to set the entity to be collisionless and when you are done, invisible as well!
3. You will need to add some userdata into the entity to customize the behavour!
```
{
  "soundURL": "https://www.myinstants.com/media/sounds/engineer_no01.mp3",
  "volume": 0.4
}

SoundURL is for a url of a sound that will play for you when you enter the entity

Volume is the volume of the sound, beware than it goes from 0 to 1 and 1 is VERY LOUD
```
4. You then put the script url into the Scripts field of the entity.
5. Now you can finally make the entity invisible!
6. Remember if you want to change the settings you will need to reload the script by clicking on the reload icon or by cachebusting the url!
```
Cachebusting a url looks like this:

https://google.com   < normal url
https://google.com?1 < cachebusted url

The ?1 basically changes the url without effecting the actually url, you can have any number you want after the ? for e.g.
https://google.com?1337423147
```

## Credits

Just Fluffy Jenkins unless someone wants to help spruce up my readme!