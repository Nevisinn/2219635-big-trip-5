import { render } from '../render';
import CreateForm from '../view/create-form-view';
import EditForm from '../view/edit-form-view';
import PointView from '../view/point-view';
import PointsList from '../view/point-list-view.js';

export default class Presenter {
  createFormViewComponent = new CreateForm();
  editFormViewComponent = new EditForm();
  pointsListViewComponent = new PointsList();

  constructor({ container, model }) {
    this.container = container;
    this.model = model;
  }

  init() {
    render(this.pointsListViewComponent, this.container);
    const points = this.model.getPoints();
    points.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const pointOffers = point.offers.map((offerId) =>
        this.model.getOfferById(point.type, offerId)
      );

      const pointView = new PointView(point, destination, pointOffers);
      render(pointView, this.pointsListViewComponent.getElement());
    });
    render(this.editFormViewComponent, this.pointsListViewComponent.getElement());
    render(this.createFormViewComponent, this.pointsListViewComponent.getElement());
  }
}
