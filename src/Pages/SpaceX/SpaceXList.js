import React, {useState, useEffect} from 'react';
import { Badge, Col, Container, Row, Table } from 'react-bootstrap';
import API from '../../Service/Api';
import { CapitalizeFirstLetter, StatusColor, TimeFormat } from '../../Utility/Utility';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import TableLoading from '../../Components/Loading/TableLoading';
import { FaFilter, FaCalendarAlt } from "react-icons/fa";
import SpaceXDetails from '../../Components/SpaceX/SpaceXDetails';
import Paginate from '../../Components/Paginate/Paginate';
import './SpaceX.Style.scss';

const SpaceXList = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [spaceList, setSpaceList] = useState([]);
    const [tempList, setTempList] = useState([]);
    const [launchesFilter, setLaunchesFilter] = useState('all')
    const [show, setShow] = useState(false);
    const [launchId, setLaunchId] = useState() 
    const [launches,setLaunches] = useState([]) 
    const [timeFilter, setTimeFilter] = useState('6month')

    useEffect(()=>{
        getSpaceList()
    },[])

    useEffect(()=>{
        handleFilters()
    },[location])

    const handleFilters = () => {
        if(location?.hash){
            const hasLaunches = location?.hash?.split('#/?launches=')[1];
            if(hasLaunches)
                setLaunchesFilter(hasLaunches)
        }
    }

    useEffect(()=>{
        if(spaceList?.length){
            const newSpaceList = tempList?.filter((list)=>{
                switch(launchesFilter){
                    case 'successfull' : return list?.launch_success===true;
                    case 'failed' : return list?.launch_success===false;
                    case 'upcoming' : return list?.upcoming;
                    default : return tempList
                }
            })
            setSpaceList(newSpaceList)
        }
    },[launchesFilter, tempList])

    const getSpaceList = async() => {
        const result = await API.get('/launches')
        let list = []
        if(result?.data){
            list = result?.data
        }
        setLoading(false)
        setTempList(list)
        setSpaceList(list)
    }

    const getLaunch = (id) => {
        setShow(true) 
        setLaunchId(id)
    }

    const handleClose = () => setShow(false);

    return(
        <Container>
            <Row className='mt-4 mb-4'>
                <Col>
                    
                </Col>
                <Col className='text-right'>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: 200}}>
                            <FaFilter/> {" "}
                            {CapitalizeFirstLetter(launchesFilter)+' Launches'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/?launches=all">All Launches</Dropdown.Item>
                            <Dropdown.Item href="#/?launches=upcoming">Upcoming Launches</Dropdown.Item>
                            <Dropdown.Item href="#/?launches=successfull">Successfull Launches</Dropdown.Item>
                            <Dropdown.Item href="#/?launches=failed">Failed  Launches</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Table striped bordered hover className='launce-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Launched (UTC)</th>
                        <th>Location</th>
                        <th>Mission</th>
                        <th>Orbit</th>
                        <th>Launch Status</th>
                        <th>Rocket</th>
                    </tr>
                </thead>
                <tbody>
                    {launches?.map((space, index)=>{
                        const {status, bg} = StatusColor(space)
                        return(
                            <tr key={index} onClick={() => getLaunch(space?.flight_number)}>
                                <td>{space?.flight_number}</td>
                                <td>{TimeFormat(space?.launch_date_utc)}</td>
                                <td>{space?.launch_site?.site_name}</td>
                                <td>{space?.mission_name}</td>
                                <td>{space?.rocket?.second_stage?.payloads[0]?.orbit ?? 'N/A'}</td>
                                <td className='text-center'>
                                    <Badge pill bg={bg}>{status}</Badge>
                                </td>
                                <td>{space?.rocket?.rocket_name}</td>
                            </tr>
                        )
                    })}
                    <TableLoading 
                        colSpan={7} 
                        spinner={loading} 
                        data={spaceList}
                    />
                </tbody>
            </Table>
            <Paginate 
                data={spaceList} 
                itemsPerPage={10} 
                setLaunches={(data)=>setLaunches(data)}
            />
            {show && (
                <SpaceXDetails 
                    show={show} 
                    setShow={setShow} 
                    launchId={launchId} 
                    handleClose={handleClose}
                />)}
        </Container>
    )
}
export default SpaceXList;