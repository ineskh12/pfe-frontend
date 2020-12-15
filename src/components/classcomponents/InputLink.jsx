import React from 'react'

export default function InputLink() {
    return (
        <div>
             < input type="url" 
        name="url"
        id="url"
        placeholder="https://www.wevioo.com/fr"
        pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
        size="30"></input>
        </div>
    )
}
