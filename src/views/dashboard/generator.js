const data =[
{ mission: 'Mali', id:'1101', statut:'Default', date:'21/10/2022 - 31/12/2022', destinations:'EMAA'},
{ mission: 'Tripoli', id:'1102', statut:'Default', date:'25/10/2019 - 15/10/2022', destinations:'EMAT'},
{ mission: 'Rome', id:'1103', statut:'Expirée', date:'08/02/2021 - 04/07/2022', destinations:'DGRE'},
{ mission: 'Paris', id:'1104', statut:'Accomplie', date:'08/03/2021 - 02/08/2022', destinations:'DGTI'},
{ mission: 'Ottawa', id:'1105', statut:'Annulée', date:'01/01/2020 - 07/09/2023', destinations:'DGTI'},
]

export function generateRows
() 
{
  return data;
}
