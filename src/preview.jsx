const React = require('react')
const styles = require('./styles.css')

module.exports = ({key, value, change, save, remove}) => {
    const onBlur = () => {
        if (value == '') {
            remove()
        } else {
            save()
        }
    };

    return(
        <div key={key} className={styles.wrapper}>
          <textarea className={styles.text} name="body" onChange={({target}) => change(target.value)} onBlur={onBlur} value={value}/>
        </div>
    )
}
