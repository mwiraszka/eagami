import type { EagamiMessages } from '../i18n.types';

/** French (France) messages. */
export const frFR: EagamiMessages = {
  alert: {
    dismiss: 'Fermer',
  },
  autocomplete: {
    empty: 'Aucun résultat',
  },
  avatarEditor: {
    upload: 'Téléverser une image',
    dropzone: 'Déposez une image ou cliquez pour téléverser',
    canvas:
      "Aperçu de l'image, faites glisser ou utilisez les flèches pour déplacer, le curseur pour zoomer",
    change: 'Changer la photo',
    revert: "Revenir à l'original",
    zoomOut: 'Dézoomer',
    zoom: 'Zoom',
    zoomIn: 'Zoomer',
    remove: "Supprimer l'image",
  },
  breadcrumbs: {
    label: "Fil d'Ariane",
  },
  codeInput: {
    groupLabel: length => `Code de vérification, ${length} chiffres`,
    digitLabel: (index, length) => `Chiffre ${index} sur ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Palette de commandes',
    searchPlaceholder: 'Tapez une commande ou recherchez…',
    empty: 'Aucun résultat',
    clear: 'Effacer la recherche',
  },
  colorPicker: {
    placeholder: 'Choisir une couleur…',
    clear: 'Effacer la couleur',
    hue: 'Teinte',
    saturationAndValue: 'Saturation et valeur',
    alpha: 'Alpha',
    eyedropper: "Prélever à l'écran",
    presets: 'Présélections',
    toggleFormat: 'Changer le format de saisie',
  },
  dataTable: {
    noData: 'Aucune donnée disponible',
  },
  datePicker: {
    placeholder: 'Sélectionner une date…',
    clear: 'Effacer la date',
    previousYear: 'Année précédente',
    previousMonth: 'Mois précédent',
    nextMonth: 'Mois suivant',
    nextYear: 'Année suivante',
    today: "Aujourd'hui",
  },
  dialog: {
    close: 'Fermer la boîte de dialogue',
  },
  drawer: {
    close: 'Fermer le panneau',
  },
  dropdown: {
    placeholder: 'Sélectionner…',
  },
  fileUploader: {
    prompt: 'Cliquez ou glissez des fichiers ici pour les téléverser',
    promptSingle: 'Cliquez ou glissez un fichier ici pour le téléverser',
    browse: 'Parcourir les fichiers',
    removeFile: name => `Supprimer ${name}`,
    fileListLabel: 'Fichiers sélectionnés',
    constraintsAccept: accept => `Acceptés : ${accept}`,
    constraintsMaxSize: size => `Max ${size} par fichier`,
    constraintsMaxFiles: count => `Jusqu’à ${count} fichiers`,
    rejectionType: name => `${name} a un type de fichier non pris en charge`,
    rejectionSize: (name, max) => `${name} dépasse la limite de ${max}`,
    rejectionCount: max => `Seuls ${max} fichiers peuvent être sélectionnés`,
    bytesUnit: { b: 'o', kb: 'Ko', mb: 'Mo', gb: 'Go', tb: 'To' },
  },
  input: {
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    clear: 'Effacer',
  },
  menu: {
    label: 'Menu',
  },
  multiSelect: {
    placeholder: 'Sélectionner…',
    searchPlaceholder: 'Rechercher…',
    searchEmpty: 'Aucun résultat',
    selectAll: 'Tout sélectionner',
    clearAll: 'Effacer la sélection',
    removeOption: label => `Supprimer ${label}`,
    selectedCount: count => `${count} sélectionné${count > 1 ? 's' : ''}`,
  },
  paginator: {
    label: 'Pagination',
    rowsPerPage: 'Lignes par page :',
    range: (start, end, total) => `${start}–${end} sur ${total}`,
    previousPage: 'Page précédente',
    nextPage: 'Page suivante',
  },
  progressBar: {
    label: 'Progression',
  },
  rating: {
    label: 'Note',
    valueLabel: (value, max) => `${value} sur ${max}`,
    clear: 'Effacer la note',
  },
  spinner: {
    label: 'Chargement',
  },
  stepper: {
    optional: 'facultatif',
  },
  tag: {
    remove: 'Supprimer',
  },
  timePicker: {
    placeholder: 'Sélectionner une heure…',
    clear: "Effacer l'heure",
    hoursLabel: 'Heures',
    minutesLabel: 'Minutes',
    secondsLabel: 'Secondes',
    incrementHours: 'Augmenter les heures',
    decrementHours: 'Diminuer les heures',
    incrementMinutes: 'Augmenter les minutes',
    decrementMinutes: 'Diminuer les minutes',
    incrementSeconds: 'Augmenter les secondes',
    decrementSeconds: 'Diminuer les secondes',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Fermer',
  },
  transferList: {
    sourceLabel: 'Disponibles',
    targetLabel: 'Sélectionnés',
    controlsLabel: 'Contrôles de transfert',
    moveSelectedToTarget: 'Déplacer la sélection vers la cible',
    moveAllToTarget: 'Tout déplacer vers la cible',
    moveSelectedToSource: 'Déplacer la sélection vers la source',
    moveAllToSource: 'Tout déplacer vers la source',
    empty: 'Aucun élément',
  },
  tree: {
    expand: 'Développer',
    collapse: 'Réduire',
  },
  wordmark: {
    overline: 'conçu avec soin par',
    tagline: 'design web élégant',
  },
};
