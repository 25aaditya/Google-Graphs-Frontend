import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output,EventEmitter } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { Theme } from '@fullcalendar/core/internal';
import {Studentdata} from '../app/ModelClass'
declare var google:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup =this.fb.group({
    graphType: [''], 
    selectedColors: this.fb.group({
      colourvalue1: [''],
      colourvalue2: [''],
      colourvalue3: [''],
      colourvalue5:[''],
      colourvalue4:['']
    }),
    WidthChange: ['250'],
    HeightChange: ['250'],
    AllNames: [null, Validators.required], 
    Radioselcted: '',
  });
  data :Studentdata[] =[] ;
  filteredDataList : Studentdata[] = [];
  alldata : Studentdata[] = [];
  allnames: string[] = [];
  fivename: string[] = [];
   PieChartvisible: boolean =false;
  BarChartvisible :boolean=false;
  DonutChartvisible :boolean=false;
  curveChartvisible :boolean|undefined;
  AreaChartvisible: boolean | undefined;
  HistogramChartvisible : boolean | undefined;
  PyramidicalChartvisible  : boolean | undefined;
  SteppedChartvisible : boolean |undefined;
  GaugeChartvisible : boolean | undefined;
  SelectedValue = '';

  constructor(private readonly api:ServiceService,private fb: FormBuilder,private readonly route:Router ) { 
    this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
    this.myForm = this.fb.group({
      AllNames: (''), 
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    this.getallname();
     this.getData();
     
  }
 
  initializeForm() {
    this.myForm = this.fb.group({
      graphType: [''], 
      AllNames: [''],
      selectedColors: this.fb.group({
        colourvalue1: ['Red'],
        colourvalue2: ['Skyblue'],
        colourvalue3: ['LightGreen'],
        colourvalue4: ['Pink'],
        colourvalue5: ['SeaGreen'],
      }),
      WidthChange: ['500'],
      HeightChange: ['500'],
      Radioselcted :['']
    });
  }

  onSubmit() {
       
      this.data = this.alldata;
      console.log(this.myForm.value);
      
        if(this.myForm.value.AllNames!='')
        {
          this.modifydata();         
        }
      
      this.PieChartvisible = this.myForm.value.graphType === 'PieChart';
      this.BarChartvisible = this.myForm.value.graphType === 'BarChart';
      this.DonutChartvisible = this.myForm.value.graphType === 'DonutChart';
      this.curveChartvisible = this.myForm.value.graphType === 'curveChart';
      this.AreaChartvisible = this.myForm.value.graphType === 'AreaChart';
      this.HistogramChartvisible = this.myForm.value.graphType === 'HistogramChart'
 
      this.drawChart();
    }
    getallname()
    {
      this.api.getallname().subscribe((data:any) => 
      {    
          this.allnames = data;
      console.log('From Data ',data);      
      });
    }
    modifydata()
    {
      this.data = this.data.filter(item => item.Name === this.myForm.value.AllNames);
      console.log(this.data);    
    }

    getData()
    {      
      this.api.getalldata().subscribe((data:any) => 
      {      
        this.data = data;  
        this.alldata = data;      
      console.log('from this.data', this.data);
      
      });
  }

    commandata()
    {
      return google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day', { role: "style" }],
        [this.data[0].Name,this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
        [this.data[1].Name,this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
        [this.data[2].Name,this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
        [this.data[3].Name,this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
        [this.data[4].Name,this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],]);
    }
    drawChart()
    {
      if (this.myForm.value.AllNames != '') {
        this.fivename[0] = 'First';

       // this.data[0].Name = 'First';
         this.fivename[1] = 'Second';
         this.fivename[2] = 'Third';
         this.fivename[3] ='Forth';
         this.fivename[4] = 'Fifth';
      }
      if (this.myForm.value.AllNames === '') {
        this.fivename[0] = this.data[0].Name;

       // this.data[0].Name = 'First';
         this.fivename[1] = this.data[1].Name;
         this.fivename[2] = this.data[2].Name;
         this.fivename[3] =this.data[3].Name;
         this.fivename[4] = this.data[4].Name;
      }
      
      if (this.myForm.value.graphType === 'AreaChart' )
      {
        this.AreaChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
        var options = {
          title:this.myForm.value.AllNames +" Marks",
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,

          hAxis: {title: 'Student',  titleTextStyle: {color:this.myForm.value.selectedColors.colourvalue1}},
          vAxis: {title:'Marks', minValue: 0,gridlines: { count: 10 } }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('divAreachart'));
        chart.draw(data, options);
      }
      
      if (this.myForm.value.graphType === 'PieChart' ) {
        
        this.BarChartvisible = false;
   
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.PieChartvisible =true;
        
      
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.data[0].Name,this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.data[1].Name,this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.data[2].Name,this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.data[3].Name,this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.data[4].Name,this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          ]);
          
        var selector1 = {
          title:this.myForm.value.AllNames +" Marks",
                 
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
          colors: [this.myForm.value.selectedColors.colourvalue1, this.myForm.value.selectedColors.colourvalue2,this.myForm.value.selectedColors.colourvalue3,this.myForm.value.selectedColors.colourvalue4,this.myForm.value.selectedColors.colourvalue5],
          
        };
        var chart = new google.visualization.PieChart(document.getElementById('divPieChart'));
        chart.draw(data, selector1);
      }
      if(this.myForm.value.graphType === 'DonutChart')
      {
        this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.DonutChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
        var selector3 = {
          title:this.myForm.value.AllNames +" Marks",
          piehole : .8, 
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
          colors: [this.myForm.value.selectedColors.colourvalue1, this.myForm.value.selectedColors.colourvalue2,this.myForm.value.selectedColors.colourvalue3,this.myForm.value.selectedColors.colourvalue4,this.myForm.value.selectedColors.colourvalue5]
         
        };
       
  
        var chart = new google.visualization.PieChart(document.getElementById('divDonutChart'));
        chart.draw(data,selector3);
      }
  
      if (this.myForm.value.graphType === 'BarChart') {
        this.PieChartvisible =false;
        this.DonutChartvisible = false;
        this.curveChartvisible = false;
        this.AreaChartvisible = false;
        this.HistogramChartvisible = false;
        this.PyramidicalChartvisible = false;
        this.SteppedChartvisible = false;
        this.BarChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
  
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);
  
        var selector2 = {
          title:this.myForm.value.AllNames +" Marks",
          width:this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
        };
        var chart = new google.visualization.BarChart(document.getElementById("divbarchart"));
        chart.draw(view, selector2);
      }
      

      if(this.myForm.value.graphType === 'curveChart')
      {
        this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.curveChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
        var selector6 = {
          title:this.myForm.value.AllNames +" Marks",
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('divcurvechart'));

        chart.draw(data,selector6);
      }



      if(this.myForm.value.graphType === 'HistogramChart')
      {
        this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.HistogramChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
        
        var selector8 = {
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
          title:this.myForm.value.AllNames +" Marks",
          colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
          legend: { position: 'none' },
        };
        
        var chart = new google.visualization.Histogram(document.getElementById('divHistogramChart'));
        chart.draw(data, selector8);
      }

      if (this.myForm.value.graphType === 'PyramidChart') {
        this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.PyramidicalChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
    
        var selector7 = {
          title:this.myForm.value.AllNames +" Marks",

            legend: { position: 'none' },
            is3D: true,
            areaOpacity: 0.7,
            width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
        };
    
        var chart = new google.visualization.AreaChart(document.getElementById('divPyramidChart'));      

    chart.draw(data, selector7);
      }



      if(this.myForm.value.graphType === 'HistogramChart')
      {
        this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.HistogramChartvisible = true;
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
        var selector4 = {
          title:this.myForm.value.AllNames +" Marks",
          legend: { position: 'none' },
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
        };
        
        var chart = new google.visualization.Histogram(document.getElementById('divHistogramChart'));
        chart.draw(data, selector4);
      }
      if (this.myForm.value.graphType === 'SteppedChart') {
        this.BarChartvisible = false;
    this.PieChartvisible =false;
    this.DonutChartvisible = false;
    this.curveChartvisible = false;
    this.AreaChartvisible = false;
    this.HistogramChartvisible = false;
    this.PyramidicalChartvisible = false;
    this.SteppedChartvisible = false;
        this.SteppedChartvisible = true;  
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day', { role: "style" }],
          [this.fivename[0],this.data[0].Total,this.myForm.value.selectedColors.colourvalue1],
          [this.fivename[1],this.data[1].Total,this.myForm.value.selectedColors.colourvalue2],
          [this.fivename[2],this.data[2].Total,this.myForm.value.selectedColors.colourvalue3],
          [this.fivename[3],this.data[3].Total,this.myForm.value.selectedColors.colourvalue4],
          [this.fivename[4],this.data[4].Total,this.myForm.value.selectedColors.colourvalue5],
          
        ]);
      
      
        var selector5 = {
          width: this.myForm.value.WidthChange,
          height: this.myForm.value.HeightChange,
          legend: { position: 'none' },
          isStacked: true,
          areaOpacity: 0.7,
          colors: ['#700826'] 
        };
        var chart = new google.visualization.SteppedAreaChart(document.getElementById('divSteppedChart'));
       
        chart.draw(data, selector5);
      }
      }
      }
      
    
  