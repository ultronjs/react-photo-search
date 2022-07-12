import React from "react";
class PreloadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      src: null,
      placeholder: this.props.placeholder || null,
    };
  }

  componentDidMount() {
    if (this.props.lazy && "IntersectionObserver" in window) {
      this.setObserver();
    } else {
      this.setPreloader();
    }
  }

  setObserver() {
    var options = {
      rootMargin: "1000px",
    };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setPreloader();
          this.observer.disconnect();
        }
      });
    },options);

    this.observer.observe(this.el);
  }

  setPreloader() {
    this.preloader = new Image();
    this.setState({
      src: `${this.props.src}&tr=bl-30,q-50`,
    });

    this.preloader.onload = () => {
      this.preloader.classList.remove(".card_placeholder_background");
      this.setState({
        loaded: true,
        src: this.props.src,
      });
    };
    this.preloader.onerror = () => {
      this.setState({
        loaded: true,
        src: this.state.placeholder,
      });
    };

    this.preloader.src = this.props.src;
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
    if (this.preloader) this.preloader.onload = null;
  }

  render() {
    return (
        <img
          src={this.state.src || this.state.placeholder}
          ref={(el) => (this.el = el)}
          onError={(e) => {
            e.target.src = this.state.placeholder;
          }}
          className={this.props.className}
          style={{
            opacity: this.state.loaded ? 1 : 0,
            transition: "opacity 300ms cubic- bezier(0.215, 0.61, 0.355, 1)",
            width: "auto",
            height: "50%",
          }}
          onClick={this.props.onClick}
          alt=""
        />
    );
  }
}

export default PreloadImage;
