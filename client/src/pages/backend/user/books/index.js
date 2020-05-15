import React, {Component} from 'react';
import MasterLayout from "../../layouts/master";
import { getUserBooks } from "../../../../api/Book"
import cookie from "js-cookie";

import SmartDataTable from 'react-smart-data-table'
import faker from 'faker'
  // ====================================================================


  
const sematicUI = {
  segment: 'ui segment',
  message: 'ui message',
  labeledInput: 'ui right labeled input',
  iconInput: 'ui icon input',
  searchIcon: 'search icon',
  rowsIcon: 'numbered list icon',
  table: 'ui compact selectable table',
  select: 'ui dropdown',
  refresh: 'ui labeled primary icon button',
  refreshIcon: 'sync alternate icon',
  change: 'ui labeled secondary icon button',
  changeIcon: 'exchange icon',
  checkbox: 'ui toggle checkbox',
  loader: 'ui active text loader',
  deleteIcon: 'trash red icon',
}

const apiDataUrls = [
  // 'https://jsonplaceholder.typicode.com/users',
  // 'https://jsonplaceholder.typicode.com/todos',
  // 'https://jsonplaceholder.typicode.com/albums',
  // 'https://jsonplaceholder.typicode.com/photos',
]



  // ====================================================================

class UserBooksIndex extends Component {



  // ====================================================================

   generateData = (numResults = 0) => {
    let total = numResults || 0
    if (typeof numResults === 'string') {
      total = parseInt(numResults, 10)
    }
    let data = []
   
    var books = this.sendRequestToGetBooks(1).then(response => {
      // data = response.books;
      this.setState({
        success: response.success,
        books: response.books,
        currentPage: response.currentPage,
        pages: response.pages,
        numOfResults: response.numOfResults,
        message: response.message,
        searchVal: response.searchVal
      });
      // console.log(response.books[2].getData().name , 'booksssssssddddddddddddddddddsss')
      console.log(data , 'q11111111bookssssssssss')

      


    });

    for (let i = 0; i < 10 ; i += 1) {
      data.push({
        _id: i,
        Name: this.state.books[i].getName(),
        Rack: this.state.books[i].getRack().name,
        Created_at: this.state.books[i].getCreated_at(),
        // Action:  ""
        actions: null,
      })
    }
   
    // for (let i = 0; i < total; i += 1) {
    //   data.push({
    //     _id: i,
    //     urls: faker.internet.url(),
    //     isMarried: faker.random.boolean(),
    //     actions: null,
    //     avatar: faker.random.boolean() ? faker.image.avatar() : '',//imgb64
    //   })
    // }
    return data
  }


  constructor(props) {
    super(props)

    this.state = {
      // apiData: '',
      apiIdx: -1,
      numResults: 10,
      data: [],
      filterValue: '',
      perPage: 0,

    }

    this.setNewData = this.setNewData.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnPerPage = this.handleOnPerPage.bind(this)
  }

  componentDidMount() {
    const { numResults } = this.state
    this.setNewData(numResults)
  }

  setNewData() {
    const { numResults } = this.state
    this.setState({
      data: this.generateData(numResults),
    })
  }


  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      if (name === 'numResults') this.setNewData()
    })
  }

  

  handleOnPerPage({ target: { name, value } }) {
    this.setState({ [name]: parseInt(value, 10) })
  }




  // ====================================================================
  state = {
    books: [],
    currentPage: null,
    pages: null,
    numOfResults: null,
    message: null,
    success: false,
    loading: false,
    searchVal: null
  };

  componentDidMount(){
    this.setState({loading: true});
    var books = this.sendRequestToGetBooks(1).then(response => {
      this.setState({
        success: response.success,
        books: response.books,
        currentPage: response.currentPage,
        pages: response.pages,
        numOfResults: response.numOfResults,
        message: response.message,
        searchVal: response.searchVal
      });
      console.log(response.books[2].getData().name , 'bookssssssssss')
      // console.log(response , 'bookssssssssss')
    });
  }



  sendRequestToGetBooks = async () => {
    return await getUserBooks()
  }


    content (){
      
      const headers = {
         actions: {
        text: 'Actions',
        sortable: false,
        filterable: false,
        transform: (value, idx, row) => (
          <button
            className='trash red icon btn btn-danger'
            style={{ cursor: 'pointer' }}
            // onClick={(e) => this.handleDelete(e, idx, row)}
            // onKeyDown={(e) => this.handleDelete(e, idx, row)}
            role='button'
            tabIndex='0'
            aria-label='delete row'
          >delete</button>
        ),
      },
      }

      const {
         data, filterValue, perPage, numResults, 
      } = this.state
      const divider = <span style={{ display: 'inline-block', margin: '10px' }} />
 


        return <>
 
<section class="wrapper">
    <div class="table-agile-info">
  <div class="panel panel-default">
    <div class="panel-heading">
      Responsive Table {cookie.get('MERN_APP_API_URL')}
      
    </div>
    {/* ================== */}

    <>
        <div className={sematicUI.segment}>
          <div className={sematicUI.iconInput}>
            <input
              type='text'
              name='filterValue'
              value={filterValue}
              placeholder='Filter results...'
              onChange={this.handleOnChange}
            />
            <i className={sematicUI.searchIcon} />
          </div>
          {divider}
          <select
            name='perPage'
            value={perPage}
            className={sematicUI.select}
            onChange={this.handleOnPerPage}
          >
            <option value='0'>
              Per Page
            </option>
            <option value='10'>
              10
            </option>
            <option value='25'>
              25
            </option>
            <option value='50'>
              50
            </option>
            <option value='100'>
              100
            </option>
          </select>
          {divider}
          { (
            <button type='button' className={sematicUI.refresh} onClick={this.setNewData}>
              <i className={sematicUI.refreshIcon} />
              Refresh Faker
            </button>
          )}
          
          { (
            <span>
              {divider}
              <div className={sematicUI.iconInput}>
                <input
                  type='text'
                  name='numResults'
                  value={numResults}
                  placeholder='# Rows'
                  onChange={this.handleOnChange}
                  style={{ width: '80px' }}
                />
                <i className={sematicUI.rowsIcon} />
              </div>
            </span>
          )}
         
        </div>
       
        <div className={sematicUI.message}>
          <p>
            { `Total rows in the table: ${data.length}`}
          </p>
        </div>
        <SmartDataTable
        headers={headers}
          data={data}
          dataKey=''
          // hideUnordered={hideUnordered}
          name='test-table'
          className={sematicUI.table}
          filterValue={filterValue}
          perPage={perPage}
          sortable
          withToggles
          withLinks
          withHeader
          loader={(
            <div className={sematicUI.loader}>
              Loading...
            </div>
          )}
          parseBool={{
            yesWord: 'Indeed',
            noWord: 'Nope',
          }}
          parseImg={{
            style: {
              border: '1px solid #ddd',
              borderRadius: '2px',
              padding: '3px',
              width: '60px',
            },
  
          }}
          dynamic
          emptyTable={(
            <div className={sematicUI.message}>
              There is no data available to display.
            </div>
          )}
        />
      </>
      
    {/* ================== */}
    <div class="row w3-res-tb">
      <div class="col-sm-5 m-b-xs">
        <select class="input-sm form-control w-sm inline v-middle">
          <option value="0">Bulk action</option>
          <option value="1">Delete selected</option>
          <option value="2">Bulk edit</option>
          <option value="3">Export</option>
        </select>
        <button class="btn btn-sm btn-default">Apply</button>
      </div>
      <div class="col-sm-4">
      </div>
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="input-sm form-control" placeholder="Search" />
          <span class="input-group-btn">
            <button class="btn btn-sm btn-default" type="button">Go!</button>
          </span>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped b-t b-light">
        <thead>
          <tr>
            <th style={{ width:'20px' }}>
              <label class="i-checks m-b-none">
                <input type="checkbox" /><i></i>
              </label>
            </th>
            <th>Name</th>
            <th>Rack</th>
            <th>Date</th>
            <th style={{ width:'30px' }}></th>
          </tr>
        </thead>
        <tbody>
          {/* {this.state.books.map((value, index) => {
            return <>
            <tr>
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]" /><i></i></label></td>
          <td>{value.getName()}</td>
              <td><span class="text-ellipsis">{value.getRack().name}</span></td>
              <td><span class="text-ellipsis">{value.getCreated_at()}</span></td>
              <td>
                <a href="" class="active" ui-toggle-class="">
                  <i class="fa fa-check text-success text-active"></i>
                  <i class="fa fa-times text-danger text"></i>
                </a>
              </td>
            </tr>
            </>
          })} */}
          
        
        </tbody>
      </table>
    </div>
    <footer class="panel-footer">
      <div class="row">

        <div class="col-sm-5 text-center">
          <small class="text-muted inline m-t-sm m-b-sm">showing 20-30 of 50 items</small>
        </div>
        <div class="col-sm-7 text-right text-center-xs">
          <ul class="pagination pagination-sm m-t-none m-b-none">
            <li><a href=""><i class="fa fa-chevron-left"></i></a></li>
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
            <li><a href="">4</a></li>
            <li><a href=""><i class="fa fa-chevron-right"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</div>
</section>

        </>
    }
  render() {
    
    return(

        <MasterLayout content={this.content()} />
    )
  }
}
export default UserBooksIndex;

