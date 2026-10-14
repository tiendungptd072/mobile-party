type Props = {
  saving: boolean;
  isSaving: boolean;
  canSave: boolean;
  onSave(): void;
};

// #region show
const saveInFlight = useRef(false);

async function handleSave() {
  if (saveInFlight.current) return;
  saveInFlight.current = true;
  setIsSaving(true);
  try {
    await saveProfile();
  } finally {
    saveInFlight.current = false;
    setIsSaving(false);
  }
}

<SaveButton canSave={canSave} isSaving={isSaving} onSave={handleSave} />
// #endregion
