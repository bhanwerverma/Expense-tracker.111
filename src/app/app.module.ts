import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgChartsModule } from "ng2-charts"
import { FormsModule } from "@angular/forms";


@NgModule({
    
    imports:[BrowserModule,NgChartsModule,AppComponent,FormsModule,NgChartsModule],
    providers:[],
    bootstrap:[]
})
export class AppModule{}