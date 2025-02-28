import { useEffect, useState } from "react";
import axios from "axios";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({
    date: "",
    vehicle: "",
    startLocation: "",
    endLocation: "",
    startMileage: "",
    endMileage: "",
    purpose: "",
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // 🟢 Fahrten abrufen
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/trips/mytrips", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(data);
      } catch (err) {
        setError("Fehler beim Laden der Fahrten.");
      }
    };
    fetchTrips();
  }, [token]);

  // 🟢 Neue Fahrt hinzufügen
  const addTrip = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/trips", newTrip, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips([...trips, data]); // Neue Fahrt zur Liste hinzufügen
      setNewTrip({
        date: "",
        vehicle: "",
        startLocation: "",
        endLocation: "",
        startMileage: "",
        endMileage: "",
        purpose: "",
      });
    } catch (err) {
      setError("Fehler beim Erstellen der Fahrt.");
    }
  };

  // 🟢 Fahrt löschen
  const deleteTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(trips.filter((trip) => trip._id !== id));
    } catch (err) {
      setError("Fehler beim Löschen der Fahrt.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Meine Fahrten</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      {/* Fahrten anzeigen */}
      <ul className="mb-4">
        {trips.map((trip) => (
          <li key={trip._id} className="border p-3 mb-2 rounded bg-gray-100 flex justify-between">
            <span>
              {trip.date} - {trip.vehicle} ({trip.startLocation} ➝ {trip.endLocation}) | {trip.distance} km
            </span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => deleteTrip(trip._id)}
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>

      {/* Neue Fahrt hinzufügen */}
      <h3 className="text-lg font-bold mb-2">Neue Fahrt hinzufügen</h3>
      <form onSubmit={addTrip} className="flex flex-col space-y-2 max-w-md">
        <input
          type="date"
          value={newTrip.date}
          onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Fahrzeug"
          value={newTrip.vehicle}
          onChange={(e) => setNewTrip({ ...newTrip, vehicle: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Startort"
          value={newTrip.startLocation}
          onChange={(e) => setNewTrip({ ...newTrip, startLocation: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Zielort"
          value={newTrip.endLocation}
          onChange={(e) => setNewTrip({ ...newTrip, endLocation: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Kilometerstand Start"
          value={newTrip.startMileage}
          onChange={(e) => setNewTrip({ ...newTrip, startMileage: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Kilometerstand Ende"
          value={newTrip.endMileage}
          onChange={(e) => setNewTrip({ ...newTrip, endMileage: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Zweck der Fahrt"
          value={newTrip.purpose}
          onChange={(e) => setNewTrip({ ...newTrip, purpose: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Fahrt speichern
        </button>
      </form>
    </div>
  );
};

export default Trips;
