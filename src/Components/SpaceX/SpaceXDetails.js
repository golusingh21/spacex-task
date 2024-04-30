import React, { useEffect, useState } from "react";
import { Badge, Modal } from "react-bootstrap";
import API from "../../Service/Api";
import './SpaceX.Style.scss';
import { StatusColor, TimeFormat } from "../../Utility/Utility";
import FullPageLoading from "../Loading/FullPageLoading";

const SpaceXDetails = ({ show, setShow, launchId, handleClose }) => {
	const [spaceX, setSpaceX] = useState(null);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getLaunch();
	}, [launchId]);

	const getLaunch = async () => {
		const result = await API.get(`/launches/${launchId}`);
		setLoading(false)
		if (result?.data) {
			setSpaceX(result?.data);
		}
	};

	const _renderStatus = () => {
		const {status, bg} = StatusColor(spaceX)
		return <Badge pill bg={bg}>{status}</Badge>
	}

	return (
		<Modal 
			show={show} 
			onHide={handleClose} 
			className="space-details"
		>
			<Modal.Header closeButton></Modal.Header>
			<FullPageLoading spinner={loading}/>
			<Modal.Body>
				<div className="header">
					<img src={spaceX?.links?.mission_patch} alt={spaceX?.mission_name} width="50px" />
					<div className="title">
						<h6>{spaceX?.mission_name}</h6>
						<small>{spaceX?.rocket?.rocket_name}</small>
					</div>
					<div>{_renderStatus()}</div>
				</div>
				<p>{spaceX?.details}</p>
				<ul>
					<li>
						<label>Flight Number</label>
						<span>{spaceX?.flight_number}</span>
					</li>
					<li>
						<label>Mission Name</label>
						<span>{spaceX?.mission_name}</span>
					</li>
					<li>
						<label>Rocket Type</label>
						<span>{spaceX?.rocket?.rocket_type}</span>
					</li>
					<li>
						<label>Rocket Name</label>
						<span>{spaceX?.rocket?.rocket_name}</span>
					</li>
					<li>
						<label>Manufacture</label>
						<span>{spaceX?.rocket?.second_stage?.payloads[0]?.manufacturer}</span>
					</li>
					<li>
						<label>Nationality</label>
						<span>{spaceX?.rocket?.second_stage?.payloads[0]?.nationality}</span>
					</li>
					<li>
						<label>Launch Date</label>
						<span>{TimeFormat(spaceX?.rocket?.rocket_name)}</span>
					</li>
					<li>
						<label>Payload Type</label>
						<span>{spaceX?.rocket?.second_stage?.payloads[0]?.payload_type}</span>
					</li>
					<li>
						<label>Orbit</label>
						<span>{spaceX?.rocket?.second_stage?.payloads[0]?.orbit ?? 'N/A'}</span>
					</li>
					<li>
						<label>Launch Site</label>
						<span>{spaceX?.launch_site?.site_name}</span>
					</li>
				</ul>
			</Modal.Body>
		</Modal>
	);
};
export default SpaceXDetails;
