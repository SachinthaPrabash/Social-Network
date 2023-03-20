import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`pt-10 md:pt-28 flex justify-center bg-${alert.alertType}`}>
        <div className={` text-black font-bold text-lg`}>
            {alert.msg}
        </div>
    </div>
))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
