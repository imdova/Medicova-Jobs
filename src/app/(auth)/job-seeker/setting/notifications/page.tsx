import { Button, Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";

const NotificationsSettingsPage = () => {
  return (
    <div>
      <div>
        <h6 className="mb-1 text-xl font-semibold text-main">
          Basic Information
        </h6>
        <p className="text-secondary">
          This is notifications preferences that you can update anytime
        </p>
      </div>
      <Divider className="my-6" />

      <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <h6 className="text-xl font-semibold text-main">Notifications</h6>
          <p className="max-w-[300px] text-secondary">
            Customize your preferred notifications settings
          </p>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox className="p-2 py-0" defaultChecked />}
              className="mb-4 flex max-w-[350px] items-start"
              label={
                <div>
                  <h6 className="text-xl font-semibold text-main">
                    Applications
                  </h6>
                  <p className="text-secondary">
                    These are notifications for jobs that you have applied for
                  </p>
                </div>
              }
            />
            <FormControlLabel
              control={<Checkbox className="p-2 py-0" />}
              className="mb-4 flex max-w-[350px] items-start"
              label={
                <div>
                  <h6 className="text-xl font-semibold text-main">Jobs</h6>
                  <p className="text-secondary">
                    These are notifications for job openings that suit your
                    profile
                  </p>
                </div>
              }
            />
            <FormControlLabel
              control={<Checkbox className="p-2 py-0" />}
              className="mb-4 flex max-w-[350px] items-start"
              label={
                <div>
                  <h6 className="text-xl font-semibold text-main">
                    Recommendations
                  </h6>
                  <p className="text-secondary">
                    These are notifications for personalized recommendations
                    from our recruiters
                  </p>
                </div>
              }
            />
          </FormGroup>
          <Button variant="contained">Update Email</Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettingsPage;
