import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faCat  } from '@fortawesome/free-solid-svg-icons'

export class IconComponent extends React.Component {

    render() {
        library.add(faCat, faStroopwafel )

        return (
            <div className="IconComponent">
                <div className="cat">
                  <FontAwesomeIcon icon="cat" />
                </div>
            </div>
        );
    }
}