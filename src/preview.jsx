const React = require('react');
module.exports = ({key, value, change, save, remove}) => {
    const onBlur = () => {
        if (value == '') {
            remove()
        } else {
            save()
        }
    };

    const styles = {
        'min-width': '300px',
        'min-height': '800px'
    }

    return(
        <div key={key} styles={styles}>
          <textarea name="body" onChange={({target}) => change(target.value)} onBlur={onBlur} value={value}/>
          <div>{value}</div>
        </div>
    )
}
