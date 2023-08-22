import { addHours, differenceInMilliseconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { useMemo, useState } from 'react';
import { useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal} = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title:'Rommys',
    notes: 'Herrera',
    start: new Date(),
    end: addHours(new Date(), 2),
  })
  
  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';
    return (formValues.title.length > 0 )
          ? ''
          : 'is-invalid';
    
  }, [formValues.title, formSubmitted])

  const onInputChange = (event) => {
    setFormValues({...formValues, [event.target.name]: event.target.value} )
  }

  const onDateChanged = (event , changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInMilliseconds(formValues.end, formValues.start);
    if(isNaN(difference) || difference <= 0){
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if(formValues.title.length <= 0) {
      console.log('the title required')
      return;
    }

    console.log(formValues);

    // TODO:
    // cerrar modal
    // remover errores en pantalla
  }


  const onCloseModal = () => {
    console.log('cerrando modal');
    closeDateModal();
  }
  return (
    <div>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
          <hr />
          <form 
            className="container"
            onSubmit={onSubmit}
          >

              <div className="form-group mb-2">
                  <label>Fecha y hora inicio</label>
                  <DatePicker 
                    selected={formValues.start} 
                    onChange={(event) => onDateChanged(event, 'start')} 
                    className='form-control'
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption='Hora'  
                  />
              </div>

              <div className="form-group mb-2">
                  <label>Fecha y hora fin</label>
                  <DatePicker
                    minDate={formValues.start} 
                    selected={formValues.end} 
                    onChange={(event) => onDateChanged(event, 'end')} 
                    className='form-control'
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption='Hora'
                  />
              </div>

              <hr />
              <div className="form-group mb-2">
                  <label>Titulo y notas</label>
                  <input 
                      type="text" 
                      className={`form-control ${titleClass}`}
                      placeholder="Título del evento"
                      name="title"
                      value={formValues.title}
                      onChange={onInputChange}
                      autoComplete="off"
                      
                  />
                  <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
              </div>

              <div className="form-group mb-2">
                  <textarea 
                      type="text" 
                      className="form-control"
                      placeholder="Notas"
                      rows="5"
                      name="notes"
                      value={formValues.notes}
                      onChange={onInputChange}
                  ></textarea>
                  <small id="emailHelp" className="form-text text-muted">Información adicional</small>
              </div>

              <button
                  type="submit"
                  className="btn btn-outline-primary btn-block"
              >
                  <i className="far fa-save"></i>
                  <span> Guardar</span>
              </button>

          </form>
      </Modal>
    </div>
  )
}
