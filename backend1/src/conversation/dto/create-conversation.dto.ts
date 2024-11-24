export class CreateConversationDto {
  title: string; // Le titre de la conversation
  participants: string[]; // Une liste des participants (noms ou identifiants)
  isGroup?: boolean; // Optionnel : Indique si c'est une conversation de groupe
  createdBy: string; // L'identifiant de l'utilisateur qui crée la conversation
}
