<template>
  <div class="head">
    <li>
      <el-button type="primary" size="small" plain @click="monthTime">月</el-button>
      <el-button type="primary" size="small" plain @click="doubleMouth">双月</el-button>
      <el-button type="primary" size="small" plain @click="quarterTime">季度</el-button>
      <el-button type="primary" size="small" plain @click="halfYear">半年</el-button>
      <el-button type="primary" size="small" plain @click="fullYear">年</el-button>
    </li>
    <el-row>
      <el-col :span="8" v-show="showTime">
        <li class="nav_left">适用时间:</li>
        <el-date-picker
          v-model="value4"
          :type=dataSize
          :placeholder="chosesData"
          :value-format="valueormatTwo"
        >
        </el-date-picker>
      </el-col>

      <el-col :span="8" v-show="showTime1">
        <li class="nav_left">适用时间:</li>
        <span @click="showDoubleMonth"><el-input v-model="choseDoubleMonth"  placeholder="选择双月"></el-input></span>
        <li class="show1" v-show="showTime1a">
          <p> <button
            type="button"
            aria-label="前一年"
            class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
            @click="prev"
          ></button>
            <span role="button" class="span-year">{{year}}年</span>
            <button
              type="button"
              aria-label="后一年"
              @click="next"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
            ></button></p>
          <p v-for="(item,index) in fullMonth">
            <span class="selectMonth" @click="selectMonth(index)">{{item}}</span>
          </p>
        </li>

      </el-col>
      <el-col :span="8" v-show="showTime2">
        <li class="nav_left">适用时间:</li>
        <span @click="showDoubleMonth"><el-input v-model="choseQuarter"  placeholder="选择季度"></el-input></span>
        <li class="show1" v-show="showTime1a">
          <p> <button
            type="button"
            aria-label="前一年"
            class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
            @click="prev"
          ></button>
            <span role="button" class="span-year">{{year}}年</span>
            <button
              type="button"
              aria-label="后一年"
              @click="next"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
            ></button></p>
          <p v-for="(item,index) in fullMonth">
            <span class="selectMonth" @click="selectQuarter(index)">{{item}}</span>
          </p>
        </li>

      </el-col>
      <el-col :span="8" v-show="showTime3">
        <li class="nav_left">适用时间:</li>
        <span @click="showDoubleMonth"><el-input v-model="halfYearMonth"  placeholder="选择半年"></el-input></span>
        <li class="show1" v-show="showTime1a">
          <p> <button
            type="button"
            aria-label="前一年"
            class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
            @click="prev"
          ></button>
            <span role="button" class="span-year">{{year}}年</span>
            <button
              type="button"
              aria-label="后一年"
              @click="next"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
            ></button></p>
          <p v-for="(item,index) in fullMonth">
            <span class="selectMonth" @click="choseHalfYear(index)">{{item}}</span>
          </p>
        </li>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        value4:'',
        input: '',
        dataSize:'',
        chosesData:'',
        showMonthYear:false,
        showTime:false,
        showTime1:false,
        showTime2:false,
        showTime3:false,
        showTime1a:false,
        year: new Date().getFullYear(),
        fullMonth:[1,2,3,4,5,6,7,8,9,10,11,12],
        doubleMouthShow:false,
        valueormatTwo:'',
        choseDoubleMonth:'',
        choseQuarter:'',
        indexType:'',
        halfYearMonth:'',
        editForm:{
          date:'',
          city:'',

        },
        Factory:'',
        brand:'',
        options1:[],
        options2:[],
        options3:[{label:'全部',value:2},{label:'定性',value:1},{label:'定量',value:0}],
        inputShow:false,
        dialogFormVisible:false,
        isInputShow:true,
        showClass1:false,
        showClass2:false,
        editShow:true,
        preservationShow:false,
        valueInputShow:false,
        valueSelectShow:false,
        valueSelectShowItem:[],
        inputIsShow:true,
        halfYearMonth1:'',
      }
    },
    computed: {


    },
    methods: {

      monthTime(){
        this.showTime=true;
        this.showTime1=false;
        this.showTime2=false;
        this.showTime3=false;
        this.showMonthYear=true;
        this.dataSize='month';
        this.chosesData='选择月';
        this.valueormatTwo='yyyy-MM'
        this.choseQuarter='';
        this.halfYearMonth='';
        this.choseDoubleMonth='';
        this.halfYearMonth1=''
      },
      doubleMouth(){
        this.showTime=false;
        this.showTime1=true;
        this.showTime2=false;
        this.showTime3=false;
        this.choseQuarter='';
        this.halfYearMonth='';
        this.value4=''
        this.halfYearMonth1=''
      },
      quarterTime(){
        this.showTime=false;
        this.showTime1=false;
        this.showTime2=true;
        this.showTime3=false;
        this.choseDoubleMonth='';
        this.halfYearMonth='';
        this.value4=''
        this.halfYearMonth1=''
      },
      halfYear(){
        this.showTime=false;
        this.showTime1=false;
        this.showTime2=false;
        this.showTime3=true;
        this.choseDoubleMonth='';
        this.choseQuarter='';
        this.value4=''

      },
      fullYear(){
        this.showTime=true;
        this.showTime1=false;
        this.showTime2=false;
        this.showTime3=false;
        this.showMonthYear=true;
        this.dataSize='year';
        this.chosesData='选择年';
        this.valueormatTwo='yyyy';
        this.choseQuarter='';
        this.halfYearMonth='';
        this.choseQuarter='';
        this.choseDoubleMonth='';
        this.halfYearMonth1=''
      },
      showDoubleMonth(){
        this.showTime1a=true;
      },
      prev() {
        this.year = this.year * 1 - 1
      },
      next() {
        this.year = this.year * 1 + 1
      },
      selectMonth(index){
        console.log(index)
        if(parseInt(index)==11){
          this.choseDoubleMonth =this.year+'-'+11+','+this.year+'-'+12;
          this.showTime1a=false
        }else if(parseInt(index)==1){
          this.choseDoubleMonth =this.year+'-'+1+','+this.year+'-'+2;
          this.showTime1a=false
        } else {
          this.choseDoubleMonth = this.year + '-' + this.fullMonth[index] + ','  + (parseInt(this.fullMonth[index]) + 1);
          this.showTime1a=false
        }
      },
      selectQuarter(index){
        console.log(parseInt(index))
        if(parseInt(index)==0 || parseInt(index)==1 || parseInt(index)==2 ){
          this.choseQuarter=this.year+'-'+'Q1';
          this.showTime1a=false
        }else if(parseInt(index)==3 || parseInt(index)==4 || parseInt(index)==5 ){
          this.choseQuarter=this.year+'-'+'Q2';
          this.showTime1a=false
        }else if(parseInt(index)==6 || parseInt(index)==7 || parseInt(index)==8 ){
          this.choseQuarter=this.year+'-'+'Q3';
          this.showTime1a=false
        }else{
          this.choseQuarter=this.year+'-'+'Q4';
          this.showTime1a=false
        }
      },
      choseHalfYear(index){
        if(parseInt(index)==0 || parseInt(index)==1 || parseInt(index)==2 || parseInt(index)==3 || parseInt(index)==4 ||parseInt(index)==5){
          this.halfYearMonth=this.year+'-'+'01'+','+'02'+','+'03'+','+'04'+','+'05'+','+'06';
          this.halfYearMonth1=this.year+'-'+'1H'
          this.showTime1a=false
        }else{
          this.halfYearMonth=this.year+'-'+'07'+','+'08'+','+'09'+','+'10'+','+'11'+','+'12';
          this.halfYearMonth1=this.year+'-'+'2H'
          this.showTime1a=false
        }
      },
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;

  }
  .head{
    padding: 20px;
  }
  .navBar input{
    width: 215px;
    height: 38px;
    display: inline-block;
  }
  .show1{
    width: 320px;
    margin-top: 5px;
    position: absolute;
    z-index: 2;

    height: 160px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    padding: 5px;
  }
  .show1 p:nth-child(1){
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f5f5f5;
  }
  .show1 p:nth-child(2){
    box-sizing: border-box;
  }
  .selectMonth{
    display: inline-block;
    float: left;
    width: 78px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .selectMonth:hover{
    background: rgba(19,131,255,0.052);
  }
  .span-year{
    width: 90%;
    margin: 0 auto;
    display: inline-block;
    text-align: center;
    line-height: 40px;

  }
  .el-input{
    width: 215px;
    height: 38px;
    display: inline-block;
  }
</style>
