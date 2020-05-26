exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Thread')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Thread').insert([
        {
          title: 'Sweden is #1',
          body:
            'Recommended measures to prevent infection include frequent hand washing, maintaining physical distance from others (especially from those with symptoms), quarantine (especially for those with symptoms), covering coughs, and keeping unwashed hands away from the face. In addition, the use of a face covering is recommended for those who suspect they have the virus and their caregivers.',
          user: 3,
        },
        {
          title: 'Get those hands cleaned!',
          body:
            'According to the World Health Organization, there are no available vaccines nor specific antiviral treatments for COVID-19. On 1 May 2020, the United States gave emergency use authorization to the antiviral remdesivir for people hospitalized with severe COVID‑19. Management involves the treatment of symptoms, supportive care, isolation, and experimental measures. The World Health Organization (WHO) ',
          user: 4,
        },
        {
          title: 'Boris Johnson is infected',
          body:
            'Fever is the most common symptom, although some older people and those with other health problems experience fever later in the disease. In one study, 44% of people had fever when they presented to the hospital, while 89% went on to develop fever at some point during their hospitalization. A lack of fever does not verify someone is disease free.',
          user: 10,
        },
        {
          title: 'We can finally go outside',
          body:
            'Other common symptoms include cough, loss of appetite, fatigue, shortness of breath, sputum production, and muscle and joint pains. Symptoms such as nausea, vomiting, and diarrhoea have been observed in varying percentages. Less common symptoms include sneezing, runny nose, sore throat, and skin lesions. Some cases in China initially presented with only chest tightness and palpitations. A decreased sense of smell or disturbances in taste may occur. Loss of smell was a presenting symptom in 30% of confirmed cases in South Korea.',
          user: 2,
        },
        {
          title: 'Poor high school graduates',
          body:
            'As is common with infections, there is a delay between the moment a person is first infected and the time he or she develops symptoms. This is called the incubation period. The average incubation period for COVID‑19 is five to six days but commonly ranges from one to 14 days, with approximately 10% of cases exceeding that time. A minority of cases do not develop noticeable symptoms at any point in time. These asymptomatic carriers tend not to get tested, and their role in transmission is not yet fully known. However, preliminary evidence suggests they may contribute to the spread of the disease.',
          user: 1,
        },
        {
          title: 'Massive production of hand gel',
          body:
            'Complications may include pneumonia, acute respiratory distress syndrome (ARDS), multi-organ failure, septic shock, and death. Cardiovascular complications may include heart failure, arrhythmias, heart inflammation, and blood clots. Approximately 20-30% of people who present with COVID‑19 have elevated liver enzymes reflecting liver injury.',
          user: 5,
        },
      ]);
    });
};
