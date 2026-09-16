import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationMap.css';

const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>';

function isValidCoordinates(latitude, longitude) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function getDirectionsUrl(latitude, longitude) {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}

function getFocusableElements(root) {
  return [...root.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
    (element) => !element.hasAttribute('disabled') && element.getClientRects().length > 0,
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.25c-3.86 0-7 3.04-7 6.78 0 5.07 6.2 11.62 6.47 11.89a.75.75 0 0 0 1.06 0C12.8 20.65 19 14.1 19 9.03c0-3.74-3.14-6.78-7-6.78Zm0 9.25a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InvalidateSize() {
  const map = useMap();

  useEffect(() => {
    const update = () => map.invalidateSize();
    update();
    const frame = window.requestAnimationFrame(update);
    const timeout = window.setTimeout(update, 250);
    window.addEventListener('resize', update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener('resize', update);
    };
  }, [map]);

  return null;
}

function LocationMapView({ latitude, longitude, zoom, name, address, showAddress }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'location-map__marker',
        html: '<span class="location-map__marker-pin"></span>',
        iconSize: [28, 40],
        iconAnchor: [14, 40],
        popupAnchor: [0, -32],
      }),
    [],
  );

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      className="location-map__leaflet"
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom
      attributionControl
    >
      <InvalidateSize />
      <TileLayer attribution={OSM_ATTRIBUTION} url={OSM_TILE_URL} maxZoom={19} />
      <Marker position={[latitude, longitude]} icon={icon} alt={name || 'Localização'}>
        <Popup>
          <div className="location-map__popup">
            {name ? <strong className="location-map__popup-title">{name}</strong> : null}
            {showAddress && address ? <p className="location-map__popup-address">{address}</p> : null}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

LocationMapView.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  name: PropTypes.string,
  address: PropTypes.string,
  showAddress: PropTypes.bool,
};

export default function LocationMap({
  latitude,
  longitude,
  name = '',
  address = '',
  zoom = 16,
  buttonLabel = 'Localização',
  showAddress = true,
  showDirectionsButton = true,
  openByDefault = false,
  className = '',
  children,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(Boolean(openByDefault));

  const valid = isValidCoordinates(latitude, longitude);
  const lat = valid ? Number(latitude) : null;
  const lng = valid ? Number(longitude) : null;
  const directionsUrl = valid ? getDirectionsUrl(lat, lng) : '';

  const openMap = useCallback(() => setOpen(true), []);
  const closeMap = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';

    if (dialog && typeof dialog.showModal === 'function' && !dialog.open) {
      dialog.showModal();
    }

    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMap();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const elements = getFocusableElements(dialogRef.current);
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, closeMap]);

  const rootClassName = ['location-map', className].filter(Boolean).join(' ');
  const triggerClassName = [
    'location-map__button',
    children ? 'location-map__button--custom' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const modal = (
    <dialog
      ref={dialogRef}
      className="location-map__overlay"
      aria-labelledby={titleId}
      aria-describedby={!valid || (showAddress && address) ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        closeMap();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeMap();
      }}
    >
      <div className="location-map__modal">
        <div className="location-map__header">
          <h2 id={titleId} className="location-map__title">
            {name || buttonLabel}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="location-map__close"
            onClick={closeMap}
            aria-label="Fechar mapa"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="location-map__content">
          {valid ? (
            <LocationMapView
              latitude={lat}
              longitude={lng}
              zoom={zoom}
              name={name}
              address={address}
              showAddress={showAddress}
            />
          ) : (
            <p id={descriptionId} className="location-map__empty">
              Localização não disponível.
            </p>
          )}
        </div>

        {valid && (name || (showAddress && address) || showDirectionsButton) ? (
          <div className="location-map__footer">
            {name ? <p className="location-map__name">{name}</p> : null}
            {showAddress && address ? (
              <p id={descriptionId} className="location-map__address">
                {address}
              </p>
            ) : null}
            {showDirectionsButton ? (
              <a
                className="location-map__directions"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PinIcon />
                Como chegar
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </dialog>
  );

  return (
    <div className={rootClassName}>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        onClick={openMap}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Ver ${name || buttonLabel} no mapa`}
      >
        {children ?? (
          <>
            <span className="location-map__button-icon">
              <PinIcon />
            </span>
            <span>{buttonLabel}</span>
          </>
        )}
      </button>
      {open && typeof document !== 'undefined' ? createPortal(modal, document.body) : null}
    </div>
  );
}

LocationMap.propTypes = {
  latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  address: PropTypes.string,
  zoom: PropTypes.number,
  buttonLabel: PropTypes.string,
  showAddress: PropTypes.bool,
  showDirectionsButton: PropTypes.bool,
  openByDefault: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
