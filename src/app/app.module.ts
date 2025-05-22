import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgChartsModule } from "ng2-charts"


@NgModule({
    
    imports:[BrowserModule,NgChartsModule,AppComponent],
    providers:[],
    bootstrap:[]
})
export class AppModule{}