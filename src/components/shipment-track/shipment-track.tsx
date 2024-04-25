import { Component, Prop, State, h } from '@stencil/core';
import { getTracking } from 'ts-tracking-number';

@Component({
  tag: 'shipment-track',
  styleUrl: 'shipment-track.css',
  shadow: true,
})
export class MyComponent {
  @State() value: string;
  @State() notFound: boolean = false;
  @State() loading: boolean = false;
  @Prop() background: string = '#ffffff';
  @Prop() color: string = '#ba1111';
  @Prop() errorcolor: string = '#ffffff';
  @Prop() errormessage: string = 'Tracking number not found, please try again';

  private handleSubmit = (event: FormDataEvent) => {
    event.preventDefault();
    this.loading = true;
    this.notFound = false;

    const noSpaces = this.value?.replace(/\s/g, '');
    const data = getTracking(noSpaces);

    setTimeout(
      () => {
        this.loading = false;
        // If data.url exists, open it in a new tab
        if (data && data.trackingUrl) {
          const url = data.trackingUrl.replace('%s', data.trackingNumber);
          window.open(url, '_blank');
        } else {
          // If data is undefined, set notFound to true
          this.notFound = true;
        }
      },
      // fake delay
      800,
    );
  };

  private handleChange(event) {
    // Reset notFound to false
    this.notFound = false;
    this.value = event.target.value;
  }

  render() {
    return (
      <form class="tracking-form" onSubmit={this.handleSubmit}>
        <fieldset style={{ background: this.background }} class="fieldInput">
          <input name="tracking-number" class="form-input" type="text" required placeholder="Tracking Number" value={this.value} onInput={event => this.handleChange(event)} />

          {this.loading ? (
            <div class="icon-wrapper">
              <span style={{ color: this.color }} class="loader"></span>
            </div>
          ) : (
            <button style={{ color: this.color }} type="submit" class="form-submit">
              Track
            </button>
          )}
        </fieldset>
        {this.notFound && (
          <p style={{ color: this.errorcolor }} class="error">
            {this.errormessage}
          </p>
        )}
      </form>
    );
  }
}
