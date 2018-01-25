import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'cms-overview-component',
  templateUrl: './cms.overview.component.html',
  styleUrls: ['./cms.overview.component.less']
})
export class CmsOverviewComponent {
  public constructor(
    private titleService: Title 
  ) {
    titleService.setTitle("CMS Übersicht - Ludwigs Rezepte");
   }
}
