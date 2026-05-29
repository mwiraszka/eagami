import { AutocompleteComponent, type SelectOption } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-autocomplete-demo-page',
  templateUrl: './autocomplete-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AutocompleteComponent, UiComponentDemoLayoutComponent],
})
export class AutocompleteDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly autocompleteValue = signal('');

  // Many breeds share a leading word, so the maxResults=3 demo overflows and exercises truncation
  protected readonly autocompleteOptions: SelectOption[] = [
    { value: 'american-bulldog', label: 'American Bulldog' },
    { value: 'american-cocker-spaniel', label: 'American Cocker Spaniel' },
    { value: 'american-eskimo-dog', label: 'American Eskimo Dog' },
    { value: 'american-foxhound', label: 'American Foxhound' },
    { value: 'american-pit-bull-terrier', label: 'American Pit Bull Terrier' },
    { value: 'american-staffordshire-terrier', label: 'American Staffordshire Terrier' },
    { value: 'american-water-spaniel', label: 'American Water Spaniel' },
    { value: 'australian-cattle-dog', label: 'Australian Cattle Dog' },
    { value: 'australian-shepherd', label: 'Australian Shepherd' },
    { value: 'australian-terrier', label: 'Australian Terrier' },
    { value: 'belgian-malinois', label: 'Belgian Malinois' },
    { value: 'belgian-sheepdog', label: 'Belgian Sheepdog' },
    { value: 'belgian-tervuren', label: 'Belgian Tervuren' },
    { value: 'bernese-mountain-dog', label: 'Bernese Mountain Dog' },
    { value: 'boston-terrier', label: 'Boston Terrier' },
    { value: 'cairn-terrier', label: 'Cairn Terrier' },
    { value: 'chinese-crested', label: 'Chinese Crested' },
    { value: 'chinese-shar-pei', label: 'Chinese Shar-Pei' },
    { value: 'english-bulldog', label: 'English Bulldog' },
    { value: 'english-cocker-spaniel', label: 'English Cocker Spaniel' },
    { value: 'english-setter', label: 'English Setter' },
    { value: 'english-springer-spaniel', label: 'English Springer Spaniel' },
    { value: 'english-toy-spaniel', label: 'English Toy Spaniel' },
    { value: 'french-bulldog', label: 'French Bulldog' },
    { value: 'french-spaniel', label: 'French Spaniel' },
    { value: 'german-pinscher', label: 'German Pinscher' },
    { value: 'german-shepherd', label: 'German Shepherd' },
    { value: 'german-shorthaired-pointer', label: 'German Shorthaired Pointer' },
    { value: 'german-wirehaired-pointer', label: 'German Wirehaired Pointer' },
    { value: 'golden-retriever', label: 'Golden Retriever' },
    { value: 'great-dane', label: 'Great Dane' },
    { value: 'great-pyrenees', label: 'Great Pyrenees' },
    { value: 'irish-setter', label: 'Irish Setter' },
    { value: 'irish-terrier', label: 'Irish Terrier' },
    { value: 'irish-water-spaniel', label: 'Irish Water Spaniel' },
    { value: 'irish-wolfhound', label: 'Irish Wolfhound' },
    { value: 'italian-greyhound', label: 'Italian Greyhound' },
    { value: 'japanese-chin', label: 'Japanese Chin' },
    { value: 'japanese-spitz', label: 'Japanese Spitz' },
    { value: 'norwegian-buhund', label: 'Norwegian Buhund' },
    { value: 'norwegian-elkhound', label: 'Norwegian Elkhound' },
    { value: 'norwegian-lundehund', label: 'Norwegian Lundehund' },
    { value: 'portuguese-water-dog', label: 'Portuguese Water Dog' },
    { value: 'scottish-deerhound', label: 'Scottish Deerhound' },
    { value: 'scottish-terrier', label: 'Scottish Terrier' },
    { value: 'tibetan-mastiff', label: 'Tibetan Mastiff' },
    { value: 'tibetan-spaniel', label: 'Tibetan Spaniel' },
    { value: 'tibetan-terrier', label: 'Tibetan Terrier' },
    { value: 'welsh-corgi', label: 'Welsh Corgi' },
    { value: 'welsh-springer-spaniel', label: 'Welsh Springer Spaniel' },
    { value: 'welsh-terrier', label: 'Welsh Terrier' },
    { value: 'yorkshire-terrier', label: 'Yorkshire Terrier' },
  ];
}
