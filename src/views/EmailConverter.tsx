import { useState, type ChangeEvent, type FormEvent } from "react";
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { parseEmailProducts } from "../functions";

export function EmailConverter() {
  const [message, setMessage] = useState("");
  const [availableProducts, setAvailableProducts] = useState<string[]>([]);
  const [unavailableProducts, setUnavailableProducts] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { available, unavailable } = parseEmailProducts(message);
    setAvailableProducts(available);
    setUnavailableProducts(unavailable);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        bgcolor: "#f5f5f5",
        padding: 2,
        pt: 6,
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "600px" } }}>
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Konwerter e-mail
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Wklej treść maila poniżej
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <TextField
              label="Treść maila"
              multiline
              rows={6}
              variant="outlined"
              value={message}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" size="large">
              Generuj listy
            </Button>
          </Box>
        </Paper>

        {(availableProducts.length > 0 || unavailableProducts.length > 0) && (
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
            {availableProducts.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>Produkty dostępne:</Typography>
                <List dense>
                  {availableProducts.map((code, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={code} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
              </>
            )}

            {unavailableProducts.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>Produkty niedostępne:</Typography>
                <List dense>
                  {unavailableProducts.map((code, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={code} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
}
