const GoogleMap = () => {
  return (
    <div className="google-map-location">
      <iframe
        title="location-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.041393596817!2d-0.1721958!3d5.5608835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf91435a310c15%3A0x3c7c14eef2e15d4c!2sTreehouse%20Restaurant!5e0!3m2!1sen!2sgh!4v1779194949667!5m2!1sen!2sgh"
  
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;

