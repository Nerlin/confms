const conferences = [
  {
    "id": 1,
    "slug": "first-ru-conf",
    "name": "Первая российская научная конференция",
    "shortDescription": "Научная конференция, посвященная последним инновациям и открытиям в области техники и медицины. Лучшие специалисты обсудят дальнейшие направления исследований и перспективы развития.",
    "date": "14 января, 2020"
  },
  {
    "id": 2,
    "slug": "ostu",
    "name": "ОГТУ",
    "shortDescription": "Конференция, организованная студентами ОГТУ для обсуждения последних достижений университета.",
    "date": "05 мая, 2020"
  }
]

export async function getConferences() {
  return conferences;
}

export async function getConferenceBySlug(slug) {
  const conference = conferences.find(conference => conference.slug === slug);
  return conference;
}