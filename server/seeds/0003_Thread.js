exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Thread')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Thread').insert([
        {
          title: 'Use a mask!',
          body:
            'Antallet af danskere indlagt på hospital ændrer sig dagligt, og flere bliver så dårlige, at de indlægges på intensive afdelinger og i respirator. Vi opdaterer hver dag med nye tal og informationer. Se hvor mange vi tester dag for dag, hvor mange nye smittetilfælde af covid-19, og hvor mange smittede vi har haft i alt. Det er vigtigt at bemærke, at Danmark den 12. marts skiftede strategi. Virus skulle ikke længere inddæmmes, men epidemien afbødes. Derfor begyndte lægerne kun at teste syge med moderat til svære symptomer, altså folk med indlæggelseskrævende sygdom. Derfor kan tallene før og efter 12. marts ikke sammenlignes.',
          user: 1,
        },
        {
          title: 'Wash hands',
          body:
            'Antallet af bekræftede covid-19-tilfælde varierer meget henover landet. Se på kortet, hvor mange bekræftede smittede der er i hver kommune. Hvis du klikker eller holder pilen hen over den enkelte kommune, kan du se dens smittetal. Du kan også zoome ind på kortet eller søge på en specifik kommune med søgefunktionen. Er du syg, så isoler dig i eget hjem og hold så vidt muligt afstand fra andre i husstanden. Alle med symptomer, der kunne være covid-19, kan nu få en test.',
          user: 1,
        },
      ]);
    });
};
