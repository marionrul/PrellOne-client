import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardFooter, Badge } from 'reactstrap'
import CardPrello from '../containers/CardPrello.container'

const ListPrello = ({id, title, cardIds}) =>(
    <Card className="bg-light mb-3" tag="div">
      <CardHeader>
        {title} 
        <Badge  color = "primary" className="float-right"></Badge> 
      </CardHeader>
          <div className="card-body" style={{flexGrow: 1, minHeight:'50px'}}>
            {
              cardIds.map(cardId => 
                <CardPrello key={cardId} cardId={cardId}></CardPrello>
              )
            }
          </div>
      <CardFooter>
      </CardFooter>
    </Card>
  )

ListPrello.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cardIds: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ListPrello;